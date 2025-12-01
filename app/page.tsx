// app/page.tsx
import Header from './components/Header';
import Main from './components/Main/page';


export const metadata = {
  title: 'Next.js App',
  description: 'A simple Next.js application',
};

export default function Page() {
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
}
