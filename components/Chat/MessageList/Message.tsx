import { useEffect, useState } from 'react';
import { Text, Group, Box } from '@mantine/core';
import { IconCompass } from '@tabler/icons-react';
import { marked } from 'marked'; // Corrected import statement
import { Message as MessageType } from '@/types/openai';

type Props = {
  message: MessageType;
  isLast: boolean;
};

export default function MessageComponent({ message, isLast }: Props) {
  // Use a state to hold the converted HTML content for each part of the message content
  const [htmlContent, setHtmlContent] = useState<string[]>([]);

  useEffect(() => {
    // Convert each text item in the message content to HTML using marked
    const convertedContent = message.content.map((item) =>
      marked(item.text?.value ?? '')
    );
    setHtmlContent(convertedContent);
  }, [message.content]); // Depend on message.content so this effect runs again if it changes

  return (
    <Group wrap="nowrap" align="flex-start" grow>
      <Box style={!isLast ? { opacity: 0.5 } : {}}>
        <IconCompass
          size={32}
          style={{ maxWidth: '32px', visibility: message.role === 'assistant' ? 'visible' : 'hidden' }}
        />
      </Box>
      {htmlContent.map((itemHtml, idx) => (
        // Render the HTML content safely, assuming the content is sanitized
        <Box key={idx} style={{ maxWidth: '100%' }}>
          <Text size="sm" dangerouslySetInnerHTML={{ __html: itemHtml }} />
        </Box>
      ))}
    </Group>
  );
}
