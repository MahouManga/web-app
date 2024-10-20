const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: ["@node-rs/argon2"]
	},
	async rewrites() {
		return [
		  {
			source: '/images/:path*',
			destination: 'http://localhost:3001/:path*', // Remove '/images' do destino
		  },
		];
	  },
};

module.exports = nextConfig;