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
				/*primary: {
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
				},*/
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
					"primary": "#818cf8",
					"primary-content": "#060715",
					"secondary": "#f471b5",
					"secondary-content": "#14040c",
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
					"primary": "#4a00ff",
					"primary-content": "#f9fafb",
					"secondary": "#ff00d3",
					"secondary-content": "#fff8fd",
					"accent": "#00188F",
					"accent-content": "#58c7f3",
					"neutral": "#415262",
					"neutral-content": "#f9fafb",
					"base-100": "#f9fafb",
					"base-200": "#EBEBEB",
					"base-300": "#E2E2DF",
					"base-content": "#161616",
					"info": "#0C98E9",
					"info-content": "#f9fafb",
					"success": "#46AF49",
					"success-content": "#f9fafb",
					"warning": "#F0AD05",
					"warning-content": "#f9fafb",
					"error": "#CC0003",
					"error-content": "#f9fafb",
				},
			},
		],
		darkTheme: 'light',
		base: false,
		styled: true,
		utils: true,
	}
};
export default config;
