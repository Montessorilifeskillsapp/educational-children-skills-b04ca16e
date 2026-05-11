import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const SUPABASE_URL = "https://lpdvohgfkjnjarrpsnqr.supabase.co";
const SUPABASE_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwZHZvaGdma2puamFycnBzbnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwMDkzOTMsImV4cCI6MjA3MDU4NTM5M30.kn53HBzAFEgy_ksfOu05iJkVPVCufKxT8yiNkBp5Vdw";

type Status = "validating" | "valid" | "already" | "invalid" | "submitting" | "done" | "error";

export default function UnsubscribePage() {
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";
  const [status, setStatus] = useState<Status>("validating");
  const [email, setEmail] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      setMessage("Missing unsubscribe token.");
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON } }
        );
        const data = await res.json();
        if (data?.alreadyUnsubscribed) {
          setStatus("already");
          setEmail(data.email ?? null);
        } else if (res.ok && data?.valid) {
          setStatus("valid");
          setEmail(data.email ?? null);
        } else {
          setStatus("invalid");
          setMessage(data?.error ?? "This link is invalid or has expired.");
        }
      } catch {
        setStatus("invalid");
        setMessage("Could not validate this link.");
      }
    })();
  }, [token]);

  const confirm = async () => {
    setStatus("submitting");
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error || !data?.success) {
        setStatus("error");
        setMessage(error?.message ?? "Could not complete unsubscribe.");
      } else {
        setStatus("done");
      }
    } catch (e: any) {
      setStatus("error");
      setMessage(e?.message ?? "Unexpected error.");
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="max-w-md w-full p-8 text-center space-y-5">
        <h1 className="text-2xl font-serif text-foreground">Email preferences</h1>

        {status === "validating" && (
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p>Checking your link…</p>
          </div>
        )}

        {status === "valid" && (
          <>
            <p className="text-muted-foreground">
              Unsubscribe {email ? <strong className="text-foreground">{email}</strong> : "this address"} from
              Montessori Life Skills emails?
            </p>
            <Button onClick={confirm} className="w-full">Confirm unsubscribe</Button>
            <Link to="/" className="block text-sm text-muted-foreground hover:underline">
              Cancel
            </Link>
          </>
        )}

        {status === "submitting" && (
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p>Updating your preferences…</p>
          </div>
        )}

        {(status === "done" || status === "already") && (
          <div className="flex flex-col items-center gap-3">
            <CheckCircle2 className="h-10 w-10 text-primary" />
            <p className="text-foreground">
              {status === "done"
                ? "You've been unsubscribed. We're sorry to see you go."
                : "This address is already unsubscribed."}
            </p>
            <Link to="/" className="text-sm text-primary hover:underline">
              Return home
            </Link>
          </div>
        )}

        {(status === "invalid" || status === "error") && (
          <div className="flex flex-col items-center gap-3">
            <AlertCircle className="h-10 w-10 text-destructive" />
            <p className="text-muted-foreground">{message}</p>
            <Link to="/contact" className="text-sm text-primary hover:underline">
              Contact support
            </Link>
          </div>
        )}
      </Card>
    </main>
  );
}
