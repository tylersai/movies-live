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
import { processSignup } from '@/repo/auth';

export function RegisterForm(props: PaperProps) {
  const { isLogged } = useAuth();
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

  const handleSubmit = async ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) => {
    const { statusCode, message } = await processSignup({ email, password, name });
    if (statusCode && statusCode !== 200) {
      alert(message);
    } else {
      router.push('/login');
    }
  };

  return (
    <Paper radius="md" p="xl" mt={32} withBorder {...props}>
      <Text size="lg" fw={500} mb={12}>
        Welcome to <Link href="/">Mv.</Link>
      </Text>

      <form
        onSubmit={form.onSubmit(({ email, password, name }) =>
          handleSubmit({ email, password, name })
        )}
      >
        <Stack>
          <TextInput
            required
            label="Name"
            placeholder="Your name"
            value={form.values.name}
            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
            radius="md"
          />

          <TextInput
            required
            label="Email"
            placeholder="mail@example.com"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Your new password"
            placeholder="Your new password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />
        </Stack>

        <Group justify="space-between" mt="lg">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => router.push('/login')}
            size="xs"
          >
            Already have an account? Login
          </Anchor>
          <Button type="submit" radius="md">
            Register
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
