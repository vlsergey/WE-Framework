let counter = 0;
const startTimestamp = Date.now().toString(36);

export default function generateRandomString (): string {
  return (startTimestamp
     + (counter++).toString(36)
     + performance.now().toString(36).replace(/[^a-z]+/g, '')
     + Math.random().toString(36).replace(/[^a-z]+/g, '')
     + Math.random().toString(36).replace(/[^a-z]+/g, '')
     + Math.random().toString(36).replace(/[^a-z]+/g, '')
     + Math.random().toString(36).replace(/[^a-z]+/g, '')).substring(0, 40);
}
