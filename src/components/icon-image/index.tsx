'use client';

import { IconDownload } from '@tabler/icons-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { type FC, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';

export const IconImage: FC<{
  image: {
    title: string;
    src?: string | null;
    width: number;
    height: number;
  };
}> = ({ image }) => {
  const t = useTranslations();
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [isImageDownloading, setIsImageDownloading] = useState(false);

  const isImageAvailable = image && image.src;

  return isImageAvailable
    ? (
        <>
          <div
            className="relative shrink-0"
            style={{
              width: image.width,
              height: image.height,
            }}
          >
            <Image
              fill
              src={image.src!}
              alt={image.title}
              className="cursor-pointer rounded-full"
              onClick={() => {
                setIsImageZoomed(!isImageZoomed);
              }}
            />
          </div>
          <Dialog
            open={isImageZoomed}
            onOpenChange={() => {
              setIsImageZoomed(false);
            }}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('icon_image.preview')}</DialogTitle>
              </DialogHeader>
              <Image
                src={image.src!}
                alt={image.title}
                width={500}
                height={500}
                className="rounded-md shadow"
              />
              <Button
                icon={IconDownload}
                loading={{ state: isImageDownloading }}
                onClick={async () => {
                  setIsImageDownloading(true);

                  try {
                    const response = await fetch(image.src!);
                    const blob = await response.blob();

                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');

                    link.href = url;
                    link.download = image.title;

                    document.body.appendChild(link);
                    link.click();

                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                  } catch {
                    toast.error(t('icon_image.error_while_downloading'));
                  } finally {
                    setIsImageDownloading(false);
                  }
                }}
              >
                {t('icon_image.download')}
              </Button>
            </DialogContent>
          </Dialog>
        </>
      )
    : null;
};
