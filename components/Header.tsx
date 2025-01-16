'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import classes from './Header.module.scss';
import { Box, Burger, Button, Divider, Drawer, Flex, Group, ScrollArea, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAuth } from '@/context/AuthContext';
import { useProfile } from '@/hooks/use-profile';
import { ACCESS_TOKEN_KEY } from '@/utils/constant';

export function Header() {
  const router = useRouter();
  const { isLogged, setIsLogged } = useAuth();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  const { data: profile } = useProfile();

  const goLogin = () => router.push('/login');
  const goSignup = () => router.push('/signup');
  const goLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    setIsLogged(false);
  };

  return (
    <Box className="Header">
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link href="/">
            <h2>Mv.</h2>
          </Link>

          <Group visibleFrom="sm">
            {isLogged && profile ? (
              <Flex align="center" gap={8}>
                <Text>{profile.email}</Text>
                <Button variant="light" onClick={goLogout}>
                  Log out
                </Button>
              </Flex>
            ) : (
              <>
                <Button variant="default" onClick={goLogin}>
                  Log in
                </Button>
                <Button onClick={goSignup}>Sign up</Button>
              </>
            )}
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Mv."
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider mb="sm" />
          <Group justify="center" grow pb="xl" px="md">
            {isLogged && profile ? (
              <>
                <Text>{profile.email}</Text>
                <Button variant="light" onClick={goLogout}>
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button variant="default" onClick={goLogin}>
                  Log in
                </Button>
                <Button onClick={goSignup}>Sign up</Button>
              </>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
