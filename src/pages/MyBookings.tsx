import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Calendar, MapPin, User, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format, isFuture, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Booking {
  id: string;
  technician_name: string;
  city: string;
  neighborhood: string;
  booking_date: string;
  booking_time: string;
  status: string;
  created_at: string;
}

const MyBookings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user?.id)
        .order("booking_date", { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar seus agendamentos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: "cancelled" })
        .eq("id", bookingId);

      if (error) throw error;

      toast({
        title: "Agendamento cancelado",
        description: "Seu agendamento foi cancelado com sucesso",
      });

      fetchBookings();
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast({
        title: "Erro",
        description: "Não foi possível cancelar o agendamento",
        variant: "destructive",
      });
    }
  };

  const handleReschedule = (booking: Booking) => {
    // Store booking data to pre-fill the form
    sessionStorage.setItem("rescheduleBooking", JSON.stringify(booking));
    navigate("/select-location");
  };

  const futureBookings = bookings.filter(
    (b) => b.status === "scheduled" && isFuture(new Date(b.booking_date))
  );

  const pastBookings = bookings.filter(
    (b) => b.status === "cancelled" || isPast(new Date(b.booking_date))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="px-6 pt-16 pb-12">
        <div className="mx-auto max-w-md">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="mr-4"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Meus Agendamentos
            </h1>
          </div>

          {/* Future Bookings */}
          {futureBookings.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Próximos agendamentos</h2>
              <div className="space-y-4">
                {futureBookings.map((booking) => (
                  <Card key={booking.id} className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-semibold">
                            {format(new Date(booking.booking_date), "dd 'de' MMMM 'de' yyyy", {
                              locale: ptBR,
                            })}
                          </p>
                          <p className="text-sm text-muted-foreground">{booking.booking_time}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">{booking.city}</p>
                          <p className="text-sm text-muted-foreground">{booking.neighborhood}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-primary mt-0.5" />
                        <p className="font-medium">{booking.technician_name}</p>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleReschedule(booking)}
                        >
                          Reagendar
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Past Bookings */}
          {pastBookings.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Agendamentos anteriores</h2>
              <div className="space-y-4">
                {pastBookings.map((booking) => (
                  <Card key={booking.id} className="p-4 opacity-60">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-semibold">
                            {format(new Date(booking.booking_date), "dd 'de' MMMM 'de' yyyy", {
                              locale: ptBR,
                            })}
                          </p>
                          <p className="text-sm text-muted-foreground">{booking.booking_time}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">{booking.city}</p>
                          <p className="text-sm text-muted-foreground">{booking.neighborhood}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <p className="font-medium">{booking.technician_name}</p>
                      </div>

                      {booking.status === "cancelled" && (
                        <p className="text-sm text-destructive font-medium">Cancelado</p>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {bookings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Você ainda não tem agendamentos</p>
              <Button onClick={() => navigate("/dashboard")}>Fazer primeiro agendamento</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
