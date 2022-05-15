import * as prismic from '@prismicio/client';

export const repositoryName = 'your-repo-name';

export function getPrismicFunction(req?: unknown) {
  return prismic.createClient(repositoryName, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });
}
