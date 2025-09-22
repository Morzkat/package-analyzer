CREATE TABLE `packages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`version` text NOT NULL,
	`description` text,
	`outdated` integer DEFAULT false NOT NULL,
	`latest_version` text,
	`alternative_packages` text,
	`size` integer NOT NULL,
	`created_at` text DEFAULT '2025-09-07T19:17:15.109Z' NOT NULL,
	`updated_at` text DEFAULT '2025-09-07T19:17:15.110Z' NOT NULL
);
