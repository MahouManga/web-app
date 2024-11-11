/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
	  serverComponentsExternalPackages: ["@node-rs/argon2"],
	  serverActions: {
		bodySizeLimit: '10mb', // Define o limite de tamanho do corpo para Server Actions
	  },
	},
	async rewrites() {
	  return [
		{
		  source: '/images/:path*',
		  destination: 'http://api-image:4001/:path*', // Remove '/images' do destino
		},
	  ];
	},
  };
  
  module.exports = nextConfig;  