import { Container } from "@mui/material";
import { StoreProvider } from "@/app/components";
import SignUpForm from "@/app/components/auth/SignUpForm";

export default function Register() {
  return (
    <Container
      maxWidth="sm"
      className="flex h-screen items-center justify-center"
    >
      <StoreProvider>
        <SignUpForm />
      </StoreProvider>
    </Container>
  );
}
