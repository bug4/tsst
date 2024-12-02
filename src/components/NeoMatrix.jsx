import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Cpu, 
  Wifi, 
  Power, 
  Volume2,
  VolumeX,
  Server,
  Globe,
  Zap,
  Code
} from 'lucide-react';

// Style for the scrollbar
const scrollbarStyle = `
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 255, 255, 0.3) transparent;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(0, 255, 255, 0.3);
    border-radius: 2px;
  }
`;

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={togglePlay}
      className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm border border-cyan-500/50 rounded-full hover:bg-cyan-500/10 transition-all duration-300 group"
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-cyan-500 animate-pulse" />
      ) : (
        <VolumeX className="w-5 h-5 text-cyan-500" />
      )}
      <span className="text-cyan-500 font-mono text-sm">
        {isPlaying ? 'Music On' : 'Music Off'}
      </span>
      <audio ref={audioRef} loop>
        <source src="/interstellar.mp3" type="audio/mp3" />
      </audio>
    </button>
  );
};

const SocialButtons = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2">
      <MusicPlayer />
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm border border-cyan-500/50 rounded-full hover:bg-cyan-500/10 transition-all duration-300"
      >
        <svg 
          className="w-5 h-5 text-cyan-500" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        <span className="text-cyan-500 font-mono text-sm">Twitter</span>
      </a>
    </div>
  );
};

const MatrixRain = () => {
  const [raindrops, setRaindrops] = useState([]);

  useEffect(() => {
    const chars = '01010101ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const columns = Math.floor(window.innerWidth / 20);
    
    const generateRaindrop = () => ({
      id: Math.random(),
      x: Math.floor(Math.random() * columns) * 20,
      y: -20,
      speed: 1 + Math.random() * 2,
      char: chars[Math.floor(Math.random() * chars.length)],
      opacity: Math.random() * 0.5 + 0.5
    });

    const initialRaindrops = Array.from({ length: 50 }, generateRaindrop);
    setRaindrops(initialRaindrops);

    const interval = setInterval(() => {
      setRaindrops(prevDrops => {
        return prevDrops.map(drop => {
          if (drop.y > window.innerHeight) {
            return generateRaindrop();
          }
          return {
            ...drop,
            y: drop.y + drop.speed,
            char: Math.random() < 0.1 ? chars[Math.floor(Math.random() * chars.length)] : drop.char
          };
        });
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {raindrops.map(drop => (
        <div
          key={drop.id}
          className="absolute font-mono text-lime-500"
          style={{
            left: `${drop.x}px`,
            top: `${drop.y}px`,
            opacity: drop.opacity,
            textShadow: '0 0 8px rgba(0, 255, 0, 0.8)',
            transition: 'opacity 0.5s'
          }}
        >
          {drop.char}
        </div>
      ))}
    </div>
  );
};

const StatBox = ({ title, value, icon: Icon }) => (
  <div className="border border-cyan-500/30 p-4 backdrop-blur-sm bg-black/50 rounded-lg hover:bg-cyan-900/20 transition-all duration-300">
    <div className="flex items-center gap-2 mb-2">
      <Icon className="w-5 h-5 text-cyan-500" />
      <span className="text-cyan-500/80 font-mono text-sm">{title}</span>
    </div>
    <div className="text-cyan-500 font-mono text-xl">{value}</div>
  </div>
);

const InfoPanel = ({ title, children }) => (
  <div className="border border-cyan-500/30 p-6 backdrop-blur-sm bg-black/50 rounded-lg">
    <h2 className="text-lg font-mono text-cyan-500 mb-4">{title}</h2>
    {children}
  </div>
);

const Website = () => {
  const [text, setText] = useState(`AUTONOMOUS SYSTEM V1.0.0
=====================================
Last login: ${new Date().toLocaleString()}
Connected to: Quantum Core Network
Security Protocol: ACTIVE
Neural Interface: STABLE

Type 'help' for available commands

system@core:~$ `);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  // Add the scrollbar style to the document head
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = scrollbarStyle;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const handleCommand = (cmd) => {
    const command = cmd.toLowerCase().trim();
  
    switch (command) {
      case 'help':
        return `Available commands:
  • solana   - Show Solana network status
  • ca       - Display ZION contract address
  • nodes    - Show active Solana nodes
  • clear    - Clear terminal`;
  
      case 'solana':
        return `Solana Network Status:
  • TPS: 2,500
  • Validators: 1,875
  • Network Latency: 0.3ms
  • Last Epoch Rewards: 4.7% APY`;
  
      case 'ca':
        return `ZION COntract Address:
  • Fetching Information ...`;
  
      case 'nodes':
        return `Active Solana Nodes:
  • 2,431 nodes active globally
  • Node Latency: Avg 0.12ms`;
  
      case 'clear':
        setText('system@core:~$ ');
        setCommandHistory([]);
        return '';
  
      default:
        return `Command not recognized. Type 'help' for available commands.`;
    }
  };
  

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const newCommand = currentInput.trim();
      if (newCommand) {
        const output = handleCommand(newCommand);
        setCommandHistory([...commandHistory, { input: newCommand, output }]);
        setText(prev => `${prev}${newCommand}\n${output}\nsystem@core:~$ `);
      }
      setCurrentInput('');
    }
  };

  const stats = [
    { title: 'Neural Cores', value: '1,024', icon: Cpu },
    { title: 'Network Speed', value: '1.2 TB/s', icon: Wifi },
    { title: 'Processing Power', value: '1.4 PHz', icon: Zap },
    { title: 'Active Nodes', value: '2.8M', icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-black text-cyan-500 relative">
      <MatrixRain />
      
      <div className="relative z-10">
        <header className="border-b border-cyan-500/30 backdrop-blur-sm bg-black/50 sticky top-0">
          <div className="container mx-auto flex justify-between items-center p-4">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 animate-pulse" />
              <span className="font-mono text-xl">NAME</span>
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex gap-2">
                <Server className="w-4 h-4 text-cyan-500 animate-pulse" />
                <Code className="w-4 h-4 text-cyan-500" />
                <Globe className="w-4 h-4 text-cyan-500 animate-pulse" />
              </div>
              <div className="h-4 w-px bg-cyan-500/30" />
              <div className="text-cyan-500/70 font-mono text-sm">
                SYSTEM v3.1.4
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto py-8 px-4 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Terminal Section */}
            <div className="md:col-span-2">
              <div className="border-2 border-cyan-500/50 p-4 backdrop-blur-sm bg-black/90 rounded-lg h-[400px]">
                <div 
                  className="font-mono text-cyan-500 whitespace-pre-wrap h-full overflow-y-auto custom-scrollbar"
                  style={{ textShadow: '0 0 5px rgba(0, 255, 255, 0.5)' }}
                >
                  {text}
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="bg-transparent border-none outline-none text-cyan-500 font-mono ml-2 w-full"
                      autoFocus
                    />
                    <span className={`text-cyan-500 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>▊</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <StatBox key={i} {...stat} />
              ))}
            </div>

            {/* Info Panel */}
            <InfoPanel title="System Capabilities">
              <div className="space-y-3 text-cyan-500/80">
                <p>• Quantum-based neural processing</p>
                <p>• Advanced cryptographic protocols</p>
                <p>• Real-time data analysis</p>
                <p>• Autonomous decision making</p>
              </div>
            </InfoPanel>
          </div>

          {/* System Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InfoPanel title="Network Status">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Bandwidth</span>
                  <span className="text-cyan-400">1.2 TB/s</span>
                </div>
                <div className="flex justify-between">
                  <span>Latency</span>
                  <span className="text-cyan-400">0.2ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Uptime</span>
                  <span className="text-cyan-400">99.999%</span>
                </div>
              </div>
            </InfoPanel>

            <InfoPanel title="Security Metrics">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Threat Level</span>
                  <span className="text-cyan-400">Minimal</span>
                </div>
                <div className="flex justify-between">
                  <span>Encryption</span>
                  <span className="text-cyan-400">Quantum</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Attack</span>
                  <span className="text-cyan-400">None</span>
                </div>
              </div>
            </InfoPanel>

            <InfoPanel title="System Load">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>CPU Usage</span>
                  <span className="text-cyan-400">32%</span>
                </div>
                <div className="flex justify-between">
                  <span>Memory</span>
                  <span className="text-cyan-400">128TB</span>
                </div>
                <div className="flex justify-between">
                  <span>Processes</span>
                  <span className="text-cyan-400">1,842</span>
                </div>
              </div>
            </InfoPanel>
          </div>
        </main>

        <SocialButtons />
      </div>
    </div>
  );
};

export default Website;