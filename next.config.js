/** @type {import('next').NextConfig} */
module.exports = {
  redirects: async () => [
    {
      source: '/',
      destination: '/secret',
      permanent: false,
    },
  ],
}
