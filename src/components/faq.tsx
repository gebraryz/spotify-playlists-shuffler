import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import type { ComponentPropsWithoutRef, ElementRef, FC } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/utils/cn';

import { ContentContainer } from './content-container';

const FaqAccordionItem = forwardRef<
  ElementRef<typeof AccordionPrimitive.Item>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b', className)}
    {...props}
  />
));

const FaqAccordionTrigger = forwardRef<
  ElementRef<typeof AccordionPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between py-4 font-medium transition-all text-left hover:underline [&[data-state=open]>svg]:rotate-180',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));

const FaqAccordionContent = forwardRef<
  ElementRef<typeof AccordionPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn('pb-4 pt-0', className)}>{children}</div>
  </AccordionPrimitive.Content>
));

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
      <AccordionPrimitive.Root type="single" collapsible>
        {questionsAndAnswrs.map(({ question, answer }) => (
          <FaqAccordionItem value={question} key={question}>
            <FaqAccordionTrigger>{question}</FaqAccordionTrigger>
            <FaqAccordionContent>{answer}</FaqAccordionContent>
          </FaqAccordionItem>
        ),
        )}
      </AccordionPrimitive.Root>
    </ContentContainer>
  );
};
