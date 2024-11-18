import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Predefined color mapping for languages
const COLORS = {
    "Jupyter Notebook": "hsl(23, 90%, 45%)",
    "HTML": "hsl(12, 77%, 52%)",
    "Java": "hsl(35, 75%, 39%)",
    "Python": "hsl(207, 51%, 43%)",
    "JavaScript": "hsl(53, 84%, 65%)",
    "CSS": "hsl(264, 34%, 36%)",
    "Assembly": "hsl(38, 71%, 25%)",
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div style={{ backgroundColor: '#fff', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
                <p>{`${data.name}: ${data.percentage}%`}</p>
                <p>{`Total Bytes: ${data.value.toLocaleString()}`}</p>
            </div>
        );
    }
    return null;
};

const GithubLanguageStats = () => {
  const [languageStats, setLanguageStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        const cacheExpiration = 3600000;
        const cachedData = localStorage.getItem('githubLanguageStats');

        if (cachedData && Date.now() - JSON.parse(cachedData).timestamp < cacheExpiration) {
          setLanguageStats(JSON.parse(cachedData).data);
          setLoading(false);
        } else {
          const reposResponse = await fetch('https://api.github.com/users/Dekel23/repos', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!reposResponse.ok) {
            if (reposResponse.status === 403) {
              setError('Unable to fetch GitHub data due to API rate limiting. Please try again later.');
            } else {
              setError('Failed to fetch GitHub data.');
            }
            setLoading(false);
            return;
          }

          const repos = await reposResponse.json();
          const filteredRepos = repos.filter(repo => repo.name !== 'DataMining-Dataprocessing');

          const languagePromises = filteredRepos.map(repo =>
            fetch(repo.languages_url, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }).then(res => res.json())
          );

          const repoLanguages = await Promise.all(languagePromises);

          const languageTotals = repoLanguages.reduce((acc, languages) => {
            Object.entries(languages).forEach(([language, bytes]) => {
              acc[language] = (acc[language] || 0) + bytes;
            });
            return acc;
          }, {});

          const totalBytes = Object.values(languageTotals).reduce((a, b) => a + b, 0);
          const formattedData = Object.entries(languageTotals)
            .map(([name, bytes]) => ({
              name,
              value: bytes,
              percentage: ((bytes / totalBytes) * 100).toFixed(1)
            }))
            .sort((a, b) => b.value - a.value);

          setLanguageStats(formattedData);
          setLoading(false);

          localStorage.setItem('githubLanguageStats', JSON.stringify({ data: formattedData, timestamp: Date.now() }));
        }
      } catch (err) {
        console.log(err)
        setError('An error occurred while fetching GitHub data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'red' }}>{error}</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                    data={languageStats}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="40%"
                    outerRadius={80}
                    label={({ name, percentage }) => `${name} (${percentage}%)`}
                    style={{ fontSize: '0.8rem' }}
                >
                    {languageStats.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[entry.name] || `#${Math.floor(Math.random()*16777215).toString(16)}`}
                        />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                    wrapperStyle={{ fontSize: '0.8rem' }}
                />
            </PieChart>
        </ResponsiveContainer>
    </div>
  );
};

export default GithubLanguageStats;