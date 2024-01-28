import { Container } from '@mui/material';
import SignInForm from '@/app/components/auth/SignInForm';
import { StoreProvider } from '@/app/components';

export default function Login() {
  return (
    <Container
      maxWidth="sm"
      className="flex h-screen items-center justify-center"
    >
      <StoreProvider>
        <SignInForm />
      </StoreProvider>
    </Container>
  );
}
