export const fetchTernerosByMadreRP = async (madreRP) => {
  try {
      const response = await fetch(`http://localhost:4000/gethijos/${madreRP}`);
      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching terneros:', error);
      return [];
  }
};
