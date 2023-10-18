/** @type {import('next').NextConfig} */
module.exports = {
  redirects: async () => [
    {
      source: '/',
      destination: '/text',
      permanent: true,
    },
  ],
}
