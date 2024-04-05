
export const loadScript = (src, callback) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = callback;
    document.body.appendChild(script);
  };