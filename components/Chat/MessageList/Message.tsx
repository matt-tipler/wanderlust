import { useEffect, useState } from 'react';
import { Text, Group, Box } from '@mantine/core';
import { IconCompass } from '@tabler/icons-react';
import { marked } from 'marked';
import { Message as MessageType } from '@/types/openai';

type Props = {
  message: MessageType;
  isLast: boolean;
};

export default function MessageComponent({ message, isLast }: Props) {
  const [htmlContent, setHtmlContent] = useState<string[]>([]);

  useEffect(() => {
    const convertedContent: string[] = message.content.map((item) =>
      // Use marked to convert Markdown to HTML and ensure the result is treated as a string
      marked(item.text?.value ?? '')
    );

    setHtmlContent(convertedContent);
  }, [message.content]);

  return (
    <Group wrap="nowrap" align="flex-start" grow>
      <Box style={!isLast ? { opacity: 0.5 } : {}}>
        <IconCompass
          size={32}
          style={{ maxWidth: '32px', visibility: message.role === 'assistant' ? 'visible' : 'hidden' }}
        />
      </Box>
      {htmlContent.map((itemHtml, idx) => (
        <Box key={idx} style={{ maxWidth: '100%' }}>
          <Text size="sm" dangerouslySetInnerHTML={{ __html: itemHtml }} />
        </Box>
      ))}
    </Group>
  );
}
