export interface ExportArgv {
	/**
	 * Режим сборки:
	 * - development -- develop-сборка;
	 * - production -- release-сборка;
	 */
	mode: 'none' | 'development' | 'production';
}

export interface Product {}

export interface ExportEnv {
	/** Сборка + анализ бандла. */
	analyze: boolean;
	/** Режим dev-server. */
	viewMode: boolean;
}
