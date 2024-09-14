import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { ContentContainer } from '../content-container';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';

export const Faq: FC = () => {
  const t = useTranslations();

  const questionsAndAnswrs = [
    {
      question: t('faq.login_security.question'),
      answer: t('faq.login_security.answer'),
    },
    {
      question: t('faq.sorting_options.question'),
      answer: t('faq.sorting_options.answer'),
    },
    {
      question: t('faq.undo_changes.question'),
      answer: t('faq.undo_changes.answer'),
    },
    {
      question: t('faq.mix_duration.question'),
      answer: t('faq.mix_duration.answer'),
    },
    {
      question: t('faq.changes_during_mix.question'),
      answer: t('faq.changes_during_mix.answer'),
    },
    {
      question: t('faq.spotify_generated_playlists.question'),
      answer: t('faq.spotify_generated_playlists.answer'),
    },
  ];

  return (
    <ContentContainer>
      <Accordion type="single" collapsible>
        {questionsAndAnswrs.map(({ question, answer }) => (
          <AccordionItem value={question} key={question}>
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ),
        )}
      </Accordion>
    </ContentContainer>
  );
};
