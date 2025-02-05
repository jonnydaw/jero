import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import {useTranslations} from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';

import HomePage from '../../app/[locale]/page'
// https://github.com/amannn/next-intl/discussions/879
const locale = "en";
// const messages = useTranslations()

describe('Home Page', () => {
  it('should render correctly', () => {
    const { container } = render(
      <NextIntlClientProvider locale={locale}>
        <HomePage/>
      </NextIntlClientProvider>,
    );
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
  });
});