import { useEffect } from 'react';

const Tips = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.border = '2px solid #0077cc';
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.observe').forEach(el => observer.observe(el));
  }, []);

  const messages = [
    "Keep it up! Every step counts.",
    "You're burning calories and stress!",
    "Stay hydrated and don't stop!"
  ];

  return (
    <>
      {messages.map((tip, i) => (
        <div key={i} className="observe" style={{ margin: '2rem 0', padding: '1rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          {tip}
        </div>
      ))}
    </>
  );
};

export default Tips;