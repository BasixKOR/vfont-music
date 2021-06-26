import Button from 'components/Button';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { AnchorHTMLAttributes } from 'react';
import { generateToken } from 'utils/csrfToken';
import { getSpotifyLoginUrl } from 'utils/spotify';

interface HomeProps {
  token: string;
}

export default function Home(props: HomeProps) {
  return (
    <main className="container flex flex-col justify-center mx-auto py-5 items-center">
      <h1 className="text-center text-5xl mb-5">vfont-music</h1>
      <Button<AnchorHTMLAttributes<HTMLAnchorElement>>
        as="a"
        href={getSpotifyLoginUrl(props.token)}
        className="bg-spotify-500 hover:bg-spotify-600 text-white"
      >
        <i className="lab la-spotify"></i>
        &nbsp;Log in
      </Button>
    </main>
  );
}

export function getServerSideProps(
  context: GetServerSidePropsContext,
): GetServerSidePropsResult<HomeProps> {
  return {
    props: {
      token: generateToken(),
    },
  };
}
