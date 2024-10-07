import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			}
		}
	},
	plugins: [
		require('daisyui'),
		require("tailwindcss-animate")
	],
	daisyui: {
		themes: [
			{
				dark: {
					"primary": "#1378CC",
					"primary-content": "#ffffff",
					"secondary": "#2b2b2b",
					"secondary-content": "#e6e6e6",
					"accent": "#393939",
					"accent-content": "#ffffff",
					"neutral": "#202020",
					"neutral-content": "#d9d9d9",
					"base-100": "#0F172A",
					"base-content": "#e0e0e0",
					"info": "#005063",
					"info-content": "#00d4ff",
					"success": "#1a3e2a",
					"success-content": "#a8e68b",
					"warning": "#5c3b20",
					"warning-content": "#ffae42",
					"error": "#7a1c1c",
					"error-content": "#ff5c5c"
				}
			},

			{
				light: {
					"primary": "#e91e63",
					"primary-content": "#ffffff",
					"secondary": "#424242",
					"secondary-content": "#ffffff",
					"accent": "#ff9800",
					"accent-content": "#ffffff",
					"neutral": "#2f3b46",
					"neutral-content": "#ffffff",
					"base-100": "#f9fafb",
					"base-200": "#e0e0e0",
					"base-300": "#c7c7c7",
					"base-content": "#1a1a1a",
					"info": "#0288d1",
					"info-content": "#ffffff",
					"success": "#388e3c",
					"success-content": "#ffffff",
					"warning": "#fbc02d",
					"warning-content": "#1a1a1a",
					"error": "#d32f2f",
					"error-content": "#ffffff",
				},
			},
		],
		darkTheme: 'dark',
		base: false,
		styled: true,
		utils: true,
	}
};
export default config;
