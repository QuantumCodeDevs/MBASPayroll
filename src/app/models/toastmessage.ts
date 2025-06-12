export class ToastMessage {
  text!: string;
  type!: 'success' | 'error' | 'info' | 'warning';
  duration?: number; // ms

  constructor(data: {
    text: string;
    type: 'success' | 'error' | 'info' | 'warning';
    duration?: number; // ms, default to 3000 if not provided
  }) {
    this.text = data.text;
    this.type = data.type;
    this.duration = data.duration ?? 3000; // Default duration is 3000 ms
  }
}