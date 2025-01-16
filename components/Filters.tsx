import { useState } from 'react';
import { IconArrowRight, IconSearch } from '@tabler/icons-react';
import { ActionIcon, Button, Flex, Text, TextInput, TextInputProps } from '@mantine/core';

type FiltersProps = TextInputProps & {
  filters: Record<string, string>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export function Filters(props: FiltersProps) {
  const { filters, setFilters } = props;
  const [value, setValue] = useState('');

  const goFilter = () => {
    setFilters((val) => ({ ...val, title: value }));
  };

  return (
    <>
      <TextInput
        radius="xl"
        size="md"
        placeholder="Filter by title"
        rightSectionWidth={42}
        leftSection={<IconSearch size={18} stroke={1.5} />}
        rightSection={
          <ActionIcon size={32} radius="xl" variant="filled" onClick={goFilter}>
            <IconArrowRight size={18} stroke={1.5} />
          </ActionIcon>
        }
        value={value}
        onChange={(v) => setValue(v.target.value)}
      />
      {filters?.title && (
        <Flex align="center" mt={8}>
          <Text>
            Title containing: <strong>"{filters.title}"</strong>
          </Text>
          <Button variant="transparent" color="red" onClick={() => setFilters({})}>
            Clear filters
          </Button>
        </Flex>
      )}
    </>
  );
}
