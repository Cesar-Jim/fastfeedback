import Head from 'next/head';
import { Button, Flex, Text, Code, Icon, Link, Stack } from '@chakra-ui/core';

import { useAuth } from '@/lib/auth';

const Home = () => {
  const auth = useAuth();

  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      maxW="450px"
      margin="0 auto"
    >
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            if (document.cookie && document.cookie.includes('fast-feedback-auth')) { 
              window.location.href = "/dashboard" 
              }
            `
          }}
        />
        <title>Fast Feedback</title>
      </Head>

      <Icon color="black" name="logo" size="64px" />
      <Text p={6} mb={4} fontSize="lg">
        <Text as="span" fontWeight="bold" display="inline">
          Fast Feedback
        </Text>

        {`. It's the easiest way to add comments or reviews to your static site. It's still a work-in-progress, but you can try it out by logging in.`}
      </Text>
      {auth.user ? (
        <Button
          as="a"
          href="/dashboard"
          backgroundColor="white"
          color="gray.900"
          variant="outline"
          fontWeight="medium"
          mt={4}
          size="lg"
          _hover={{ bg: 'gray.100' }}
          _active={{
            bg: 'gray.100',
            transform: 'scale(0.95)'
          }}
        >
          View Dashboard
        </Button>
      ) : (
        <Stack>
          <Button
            onClick={(e) => auth.signinWithGitHub()}
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            leftIcon="github"
            mt={4}
            size="lg"
            _hover={{ bg: 'gray.700' }}
            _active={{
              bg: 'gray.800',
              transform: 'scale(0.95)'
            }}
          >
            Sign In with GitHub
          </Button>
          <Button
            onClick={(e) => auth.signinWithGoogle()}
            backgroundColor="white"
            color="gray.900"
            variant="outline"
            fontWeight="medium"
            leftIcon="google"
            mt={4}
            size="lg"
            _hover={{ bg: 'gray.100' }}
            _active={{
              bg: 'gray.100',
              transform: 'scale(0.95)'
            }}
          >
            Sign In with Google
          </Button>
        </Stack>
      )}
    </Flex>
  );
};

export default Home;
