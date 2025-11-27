/**
 * AudioManager - Handles game sound effects using Web Audio API
 * Provides methods to play, pause, and control volume for all game sounds
 */

type SoundType = 'eat' | 'gameOver' | 'levelUp' | 'powerUp';

class AudioManager {
    private audioContext: AudioContext | null = null;
    private sounds: Map<SoundType, AudioBuffer | null> = new Map();
    private enabled: boolean = true;
    private volume: number = 0.3;

    constructor() {
        if (typeof window !== 'undefined') {
            this.initializeAudio();
        }
    }

    /**
     * Initialize Web Audio API context
     */
    private initializeAudio(): void {
        try {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            this.generateSounds();
        } catch (error) {
            console.warn('Web Audio API not supported:', error);
        }
    }

    /**
     * Generate synthetic sound effects using oscillators
     */
    private generateSounds(): void {
        if (!this.audioContext) return;

        // Eat sound - short beep
        this.sounds.set('eat', this.createTone(800, 0.1));

        // Game over sound - descending tone
        this.sounds.set('gameOver', this.createDescendingTone());

        // Level up sound - ascending chime
        this.sounds.set('levelUp', this.createAscendingTone());

        // Power up sound - special effect
        this.sounds.set('powerUp', this.createPowerUpTone());
    }

    /**
     * Create a simple tone
     */
    private createTone(frequency: number, duration: number): AudioBuffer | null {
        if (!this.audioContext) return null;

        const sampleRate = this.audioContext.sampleRate;
        const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < buffer.length; i++) {
            const t = i / sampleRate;
            data[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-3 * t);
        }

        return buffer;
    }

    /**
     * Create descending tone for game over
     */
    private createDescendingTone(): AudioBuffer | null {
        if (!this.audioContext) return null;

        const sampleRate = this.audioContext.sampleRate;
        const duration = 0.5;
        const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < buffer.length; i++) {
            const t = i / sampleRate;
            const frequency = 400 - (300 * t / duration);
            data[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-2 * t);
        }

        return buffer;
    }

    /**
     * Create ascending tone for level up
     */
    private createAscendingTone(): AudioBuffer | null {
        if (!this.audioContext) return null;

        const sampleRate = this.audioContext.sampleRate;
        const duration = 0.3;
        const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < buffer.length; i++) {
            const t = i / sampleRate;
            const frequency = 400 + (400 * t / duration);
            data[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-4 * t);
        }

        return buffer;
    }

    /**
     * Create power-up tone
     */
    private createPowerUpTone(): AudioBuffer | null {
        if (!this.audioContext) return null;

        const sampleRate = this.audioContext.sampleRate;
        const duration = 0.2;
        const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < buffer.length; i++) {
            const t = i / sampleRate;
            const frequency = 600 + (200 * Math.sin(20 * Math.PI * t));
            data[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-5 * t);
        }

        return buffer;
    }

    /**
     * Play a sound effect
     */
    play(soundType: SoundType): void {
        if (!this.enabled || !this.audioContext || !this.sounds.has(soundType)) {
            return;
        }

        const buffer = this.sounds.get(soundType);
        if (!buffer) return;

        try {
            const source = this.audioContext.createBufferSource();
            const gainNode = this.audioContext.createGain();

            source.buffer = buffer;
            gainNode.gain.value = this.volume;

            source.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            source.start(0);
        } catch (error) {
            console.warn('Error playing sound:', error);
        }
    }

    /**
     * Set volume (0 to 1)
     */
    setVolume(volume: number): void {
        this.volume = Math.max(0, Math.min(1, volume));
    }

    /**
     * Enable or disable sound
     */
    setEnabled(enabled: boolean): void {
        this.enabled = enabled;
    }

    /**
     * Get current enabled state
     */
    isEnabled(): boolean {
        return this.enabled;
    }

    /**
     * Get current volume
     */
    getVolume(): number {
        return this.volume;
    }
}

// Export singleton instance
export const audioManager = new AudioManager();
