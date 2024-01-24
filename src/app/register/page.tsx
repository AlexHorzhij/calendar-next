import { Container } from "@mui/material";
import SignUpForm from "@/app/components/auth/SignUpForm";
import StoreProvider from "@/app/components/ReduxProvider";

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
