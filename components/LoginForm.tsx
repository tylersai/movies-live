/* eslint-disable no-alert */
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Anchor,
  Button,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuth } from '@/context/AuthContext';
import { processLogin } from '@/repo/auth';
import { ACCESS_TOKEN_KEY } from '@/utils/constant';

export function LoginForm(props: PaperProps) {
  const { isLogged, setIsLogged } = useAuth();
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  useEffect(() => {
    if (isLogged) {
      router.push('/');
    }
  }, [isLogged]);

  const handleSubmit = async ({ email, password }: { email: string; password: string }) => {
    const { access_token, statusCode, message } = await processLogin({ email, password });
    if (statusCode && statusCode !== 200) {
      alert(message);
    } else {
      setIsLogged(true);
      localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
    }
  };

  return (
    <Paper radius="md" p="xl" mt={32} withBorder {...props}>
      <Text size="lg" fw={500} mb={12}>
        Welcome to <Link href="/">Mv.</Link>
      </Text>

      <form onSubmit={form.onSubmit(({ email, password }) => handleSubmit({ email, password }))}>
        <Stack>
          <TextInput
            required
            label="Email"
            placeholder="test@example.com"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => router.push('/signup')}
            size="xs"
          >
            Don't have an account? Register
          </Anchor>
          <Button type="submit" radius="md">
            Login
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
