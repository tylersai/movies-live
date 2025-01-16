/* eslint-disable no-alert */
import classes from './MovieCard.module.scss';
import { IconTrash } from '@tabler/icons-react';
import { ActionIcon, Card, Group, Image, Text } from '@mantine/core';
import { useAuth } from '@/context/AuthContext';
import { useDeleteMovie } from '@/hooks/use-delete-movie';
import { Movie } from '@/types/movie';

type MovieCardProps = Movie & { fetchData: () => Promise<void> };

function MovieCard(props: MovieCardProps) {
  const { _id, title, overview, poster_path, rating, count, fetchData } = props;

  const { isLogged } = useAuth();
  const { mutate } = useDeleteMovie();

  const goDelete = async () => {
    const result = await mutate(_id);
    if (result) {
      alert('Deleted successfully');
      fetchData();
    } else {
      alert('Failed to delete');
    }
  };

  return (
    <Card withBorder radius="md" p="md" mx={8} my={8} className={classes.card}>
      <Card.Section>
        <Image className={classes.poster} src={poster_path} alt="No Poster" height={300} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md" px={8}>
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {title}
          </Text>
        </Group>
        <Text fz="sm" mt="xs">
          Rating: <strong>{rating}</strong> (
          {(count || 0).toLocaleString('en-US', { useGrouping: true })})
        </Text>
        <Text fz="sm" mt="xs">
          {overview}
        </Text>
      </Card.Section>

      {isLogged && (
        <Group mt="xs" justify="flex-end">
          <ActionIcon variant="default" radius="md" size={36} onClick={goDelete}>
            <IconTrash className={classes.like} stroke={1.5} />
          </ActionIcon>
        </Group>
      )}
    </Card>
  );
}

export default MovieCard;
