import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import HeroSection from './components/HeroSection';
import AnimatedSection from './components/AnimatedSection';
import FeatureCard from './components/FeatureCard';
import FloatingButton from './components/FloatingButton';
import Navbar from './components/Navbar';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import 소리버튼 from './소리버튼.png';
import 음소거버튼 from './음소거버튼.png';

const AppContainer = styled.div`
  font-family: 'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 40px; /* 상단바 두께 줄임에 맞춰 조정 */
`;

const FeaturesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #333;
  text-align: center;
  letter-spacing: -0.01em;
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  color: #666;
  max-width: 800px;
  margin: 0 auto 4rem;
  text-align: center;
  line-height: 1.6;
`;

const EmailInput = styled.input`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  margin-right: 1rem;
  width: 300px;
  backdrop-filter: blur(10px);

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    outline: none;
    border-color: white;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

const SubscribeButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  border-radius: 50px;
  color: white;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    padding: 0 2rem;
  }
`;

const HowItWorksSection = styled.section`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 3rem 1rem 2.5rem 1rem;
  text-align: center;
`;

const HowItWorksDesc = styled.div`
  color: #757575;
  font-size: 1.15rem;
  margin-bottom: 2.2rem;
  text-align: center;
  line-height: 1.7;
  span.unknown {
    background-image: url('data:image/svg+xml;utf8,<svg width="100%25" height="8" viewBox="0 0 100 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 4 Q25 8 50 4 T100 4" stroke="%23f8a5a5" stroke-width="4" stroke-linecap="round" fill="none"/></svg>');
    background-repeat: no-repeat;
    background-size: 100% 0.55em;
    background-position: 0 90%;
    border-bottom: none;
    border-radius: 0.2em;
    padding: 0 0.1em;
  }
  span.seen {
    background-image: url('data:image/svg+xml;utf8,<svg width="100%25" height="8" viewBox="0 0 100 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 4 Q25 8 50 4 T100 4" stroke="%23ffd59e" stroke-width="4" stroke-linecap="round" fill="none"/></svg>');
    background-repeat: no-repeat;
    background-size: 100% 0.55em;
    background-position: 0 90%;
    border-bottom: none;
    border-radius: 0.2em;
    padding: 0 0.1em;
  }
  span.known {
    background-image: url('data:image/svg+xml;utf8,<svg width="100%25" height="8" viewBox="0 0 100 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 4 Q25 8 50 4 T100 4" stroke="%23b6e7a0" stroke-width="4" stroke-linecap="round" fill="none"/></svg>');
    background-repeat: no-repeat;
    background-size: 100% 0.55em;
    background-position: 0 90%;
    border-bottom: none;
    border-radius: 0.2em;
    padding: 0 0.1em;
  }
  code {
    background: #ececec;
    border-radius: 6px;
    padding: 0.1em 0.5em;
    font-size: 1em;
    font-family: inherit;
  }
`;

const HowItWorksExample = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin: 2.5rem 0 1.5rem 0;
  word-break: keep-all;
  text-align: center;
  span.unknown {
    background-image: url('data:image/svg+xml;utf8,<svg width="100%25" height="12" viewBox="0 0 100 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 6 Q25 12 50 6 T100 6" stroke="%23f8a5a5" stroke-width="6" stroke-linecap="round" fill="none"/></svg>');
    background-repeat: no-repeat;
    background-size: 100% 0.7em;
    background-position: 0 90%;
    border-bottom: none;
    border-radius: 0.2em;
    padding: 0 0.1em;
  }
  span.seen {
    background-image: url('data:image/svg+xml;utf8,<svg width="100%25" height="12" viewBox="0 0 100 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 6 Q25 12 50 6 T100 6" stroke="%23ffd59e" stroke-width="6" stroke-linecap="round" fill="none"/></svg>');
    background-repeat: no-repeat;
    background-size: 100% 0.7em;
    background-position: 0 90%;
    border-bottom: none;
    border-radius: 0.2em;
    padding: 0 0.1em;
  }
  span.known {
    background-image: url('data:image/svg+xml;utf8,<svg width="100%25" height="12" viewBox="0 0 100 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 6 Q25 12 50 6 T100 6" stroke="%23b6e7a0" stroke-width="6" stroke-linecap="round" fill="none"/></svg>');
    background-repeat: no-repeat;
    background-size: 100% 0.7em;
    background-position: 0 90%;
    border-bottom: none;
    border-radius: 0.2em;
    padding: 0 0.1em;
  }
`;

const HowItWorksHint = styled.div`
  color: #888;
  font-size: 1.15rem;
  margin-top: 2.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
`;

// 하이라이트 스타일 정의
const highlightStyle = {
  transition: 'background 0.2s',
  borderRadius: '6px',
  cursor: 'pointer',
  padding: '0 0.15em',
  display: 'inline-block',
};
const highlightHoverStyle = {
  background: '#e0eaff', // 더 진한 하이라이트
};

// 어절별 하이라이트 컴포넌트
function HighlightedPhrase({ text, highlightWords }: { text: string; highlightWords: {word: string; style: React.CSSProperties}[] }) {
  return (
    <>
      {text.split(' ').map((word: string, idx: number) => {
        const highlight = highlightWords?.find((hw: {word: string; style: React.CSSProperties}) => word.replace(/[^\w가-힣]/g, '') === hw.word.replace(/[^\w가-힣]/g, ''));
        return (
          <span
            key={idx}
            style={{
              ...highlightStyle,
              ...(highlight ? highlight.style : {}),
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#e0eaff')}
            onMouseLeave={e => (e.currentTarget.style.background = '')}
          >
            {word + (idx !== text.split(' ').length-1 ? ' ' : '')}
          </span>
        );
      })}
    </>
  );
}

function App() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email subscription logic
  };

  // How it works 섹션 inView 감지
  const [howItWorksRef, inView] = useInView({ threshold: 0.3, triggerOnce: false });

  // 비디오 변환 상태 및 자동재생, 음소거
  const [muted, setMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isDubbed, setIsDubbed] = useState(false);
  const [shakeTrigger, setShakeTrigger] = useState(0);
  const [videoRef, videoInView] = useInView({ threshold: 0.3, triggerOnce: false });
  const videoDomRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  //1.mp3 음량 70%로 고정
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  // 자동재생: 보이는 쪽만 play
  useEffect(() => {
    if (videoInView && videoDomRef.current) {
      videoDomRef.current.play();
    }
  }, [videoInView]);

  // convert 버튼: 영어 → 한국어 더빙 또는 한국어 → 영어(원래 오디오)
  const handleConvert = () => {
    setShakeTrigger(0);
    setTimeout(() => setShakeTrigger(1), 0);
    if (!isDubbed) {
      // 영어 → 한국어 더빙
      if (videoDomRef.current && audioRef.current) {
        audioRef.current.currentTime = videoDomRef.current.currentTime;
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
        videoDomRef.current.muted = true;
      }
    } else {
      // 한국어 → 영어(원래 오디오)
      if (videoDomRef.current && audioRef.current) {
        audioRef.current.pause();
        videoDomRef.current.muted = false;
      }
    }
    setIsDubbed(d => !d);
  };

  // video play/pause/seek 시 audio도 동기화
  useEffect(() => {
    const v = videoDomRef.current;
    const a = audioRef.current;
    if (!v || !a) return;
    const syncAudio = () => {
      if (isDubbed) {
        a.currentTime = v.currentTime;
      }
    };
    const playAudio = () => {
      if (isDubbed && a.paused) {
        a.currentTime = v.currentTime;
        a.play().catch(e => console.log('Audio sync play failed:', e));
      }
    };
    const pauseAudio = () => {
      if (isDubbed && !a.paused) a.pause();
    };
    // 비디오가 루프될 때 오디오도 함께 동기화
    const handleTimeUpdate = () => {
      if (isDubbed) {
        // 비디오가 루프되어 처음으로 돌아갔을 때
        if (Math.abs(v.currentTime - a.currentTime) > 1) {
          a.currentTime = v.currentTime;
        }
      }
    };
    
    // 오디오가 끝났을 때 처리 (loop 속성이 있어도 동기화 보장)
    const handleAudioEnded = () => {
      if (isDubbed && !v.paused) {
        a.currentTime = v.currentTime;
        a.play().catch(e => console.log('Audio restart failed:', e));
      }
    };
    
    // 오디오 로드 완료 시 동기화
    const handleAudioLoaded = () => {
      if (isDubbed) {
        a.currentTime = v.currentTime;
      }
    };
    
    v.addEventListener('seeked', syncAudio);
    v.addEventListener('play', playAudio);
    v.addEventListener('pause', pauseAudio);
    v.addEventListener('timeupdate', handleTimeUpdate);
    a.addEventListener('ended', handleAudioEnded);
    a.addEventListener('loadeddata', handleAudioLoaded);
    
    return () => {
      v.removeEventListener('seeked', syncAudio);
      v.removeEventListener('play', playAudio);
      v.removeEventListener('pause', pauseAudio);
      v.removeEventListener('timeupdate', handleTimeUpdate);
      a.removeEventListener('ended', handleAudioEnded);
      a.removeEventListener('loadeddata', handleAudioLoaded);
    };
  }, [isDubbed]);

  // muted 상태에 따라 video, audio 모두 완전 음소거 처리
  useEffect(() => {
    if (muted) {
      if (videoDomRef.current) videoDomRef.current.muted = true;
      if (audioRef.current) audioRef.current.muted = true;
    } else {
      if (videoDomRef.current) videoDomRef.current.muted = isDubbed ? true : false;
      if (audioRef.current) audioRef.current.muted = false;
    }
  }, [muted, isDubbed]);

  // 영상 더빙 데모 등장 애니메이션
  const [dubbingRef, dubbingInView] = useInView({ threshold: 0.2, triggerOnce: true });

  const handleMuteToggle = () => {
    if (!hasInteracted) setHasInteracted(true);
    setMuted(m => {
      const newMuted = !m;
      // 소리 켜는 순간 play()를 명시적으로 호출
      if (!newMuted && videoDomRef.current) {
        videoDomRef.current.play();
      }
      return newMuted;
    });
  };

  return (
    <AppContainer>
      <Navbar />
      <div id="home">
      <HeroSection />
      </div>
      <div id="how-it-works">
        <HowItWorksSection ref={howItWorksRef}>
          {/* 영어→한국어 더빙 데모 */}
          <motion.div
            ref={dubbingRef}
            style={{ maxWidth: window.innerWidth > 900 ? 1000 : 480, margin: '0 auto 2.5rem auto', textAlign: 'center', position: 'relative' }}
            initial={{ opacity: 0, y: 40 }}
            animate={dubbingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div style={{
              fontSize: '2rem', fontWeight: 400, color: '#222', marginBottom: '2.2rem', letterSpacing: '-0.01em', textAlign: 'center',
              marginTop: '3.96rem'
            }}>
              Try Live <span style={{ fontWeight: 'bold' }}>Dubbing</span> Now!
            </div>
            <div style={{
              fontSize: '1.08rem', fontWeight: 400, color: '#757575', textAlign: 'center', marginBottom: '2.2rem', letterSpacing: '-0.01em'
            }}>
              Instantly switch any <b>English video</b> into <b>Korean</b> with just one click—<b>seamless dubbing</b> for effortless viewing.
            </div>
            {/* 영상 + 더빙 안내문구 */}
            <div style={{ position: 'relative', width: '100%', maxWidth: window.innerWidth > 900 ? 700 : 480, aspectRatio: '16/9', margin: '0 auto 0.3rem auto' }}>
              <motion.video
                ref={el => { videoRef(el); videoDomRef.current = el; }}
                src="1.mp4"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 16,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                  background: '#000',
                }}
                autoPlay
                loop
                muted={isDubbed ? true : (!hasInteracted ? muted : false)} // 실제 음소거는 useEffect에서 제어
                initial={{ rotate: 0 }}
                animate={shakeTrigger === 1 ? { rotate: [0, -2.5, 2.5, -1.5, 1.5, 0] } : { rotate: 0 }}
                transition={{ duration: 0.55, ease: [0.4, 0.0, 0.2, 1] }}
              />
              <audio ref={audioRef} src="1.mov" loop preload="auto" />
            </div>
            <div
              style={{
                width: '100%',
                textAlign: 'center',
                fontSize: window.innerWidth > 900 ? '1rem' : '0.9rem',
                color: '#222',
                opacity: 0.3,
                fontWeight: 500,
                letterSpacing: '-0.01em',
                margin: window.innerWidth > 900 ? '0 0 1rem 0' : '0 0 1rem 0',
                userSelect: 'none',
                pointerEvents: 'none',
                marginBottom: '1rem',
              }}
            >
              Try real-time dubbing conversion!
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginBottom: '3.2rem' }}>
              <motion.button
                onClick={handleMuteToggle}
                style={{
                  background: 'none', border: 'none', boxShadow: 'none', padding: 0, margin: 0,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
                animate={(!hasInteracted && muted)
                  ? { rotate: [0, -15, 15, -10, 10, -5, 5, 0], y: [0, -10, 0, -7, 0, -4, 0, 0] }
                  : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.8, repeat: (!hasInteracted && muted) ? Infinity : 0, repeatDelay: 0.8 }}
                whileTap={{ scale: 1.2 }}
              >
                <img
                  src={muted ? 음소거버튼 : 소리버튼}
                  alt={muted ? '음소거' : '소리'}
                  style={{ width: 54, height: 54, objectFit: 'contain', display: 'block' }}
                />
              </motion.button>
              <button
                onClick={handleConvert}
                style={{
                  background: isDubbed ? '#06d6a0' : '#6C8CFF', color: '#fff', border: 'none', borderRadius: 999,
                  fontWeight: 600, fontSize: '1rem', padding: '0.56em 1.6em', cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(80,120,200,0.08)', transition: 'background 0.2s'
                }}
              >
                {isDubbed ? 'Korean Dubbing On' : 'Korean Dubbing Off'}
              </button>
            </div>
          </motion.div>
          <motion.h2
            style={{
              fontSize: '2.3rem',
              fontWeight: 400,
              marginBottom: '1.2rem',
              marginTop: '10rem',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              textAlign: 'center',
            }}
            initial={{ opacity: 0, y: -40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
            transition={{ duration: 1.3, delay: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Watch <span style={{ fontWeight: 700, fontSize: '2.5rem' }}>it work</span> instantly!<br />
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1.2, delay: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <HowItWorksDesc>
              <div
                style={{
                  textAlign: 'center',
                  maxWidth: 700,
                  margin: '0 auto',
                  fontSize: '1.08rem',
                  lineHeight: 1.7,
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                  color: '#757575',
                  // 모바일에서 왼쪽 정렬
                  ...(window.innerWidth <= 768 ? { textAlign: 'left' } : {})
                }}
              >
                Stream & learn on your favorite <span style={{borderBottom:'2px solid #A3BFFA', fontWeight:600}}>OTT</span> content.<br />
                Hanvert gives you <span style={{borderBottom:'2px solid #FFD6D6', fontWeight:600}}>step-by-step</span> Korean translations and <span style={{borderBottom:'2px solid #B6E7A0', fontWeight:600}}>key words</span> with underlines.
              </div>
            </HowItWorksDesc>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1.4, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <HowItWorksExample>
              <div style={{fontSize: '0.98rem', color: '#888', marginBottom: '0.5rem', letterSpacing: '-0.01em'}}>Original</div>
              <div style={{fontWeight: 500, fontSize: '1.08rem', marginBottom: '4rem', color: '#222'}}>The doctor advised him to exercise regularly to improve his health.</div>
              <div style={{marginBottom: '1.5rem'}}>
                <div style={{fontWeight: 600, color: '#6C8CFF', marginBottom: '0.13rem', fontSize: '0.97rem'}}>Beginner Level (TOPIK 1~2)</div>
                <div style={{color:'#222', fontSize:'1.47rem', lineHeight:'1.7'}}>
                  <HighlightedPhrase
                    text="의사는 그에게 건강을 위해 자주 운동하라고 했어요."
                    highlightWords={[
                      {word: '의사는', style: {fontWeight:600, textDecoration:'underline', textDecorationColor:'#6C8CFF', textDecorationThickness:'2px', textUnderlineOffset:'4px'}},
                      {word: '건강을', style: {fontWeight:600, textDecoration:'underline', textDecorationColor:'#6C8CFF', textDecorationThickness:'2px', textUnderlineOffset:'4px'}},
                      {word: '운동하라고', style: {fontWeight:600, textDecoration:'underline', textDecorationColor:'#6C8CFF', textDecorationThickness:'2px', textUnderlineOffset:'4px'}},
                    ]}
                  />
                </div>
              </div>
              <div style={{marginBottom: '2rem'}}>
                <div style={{fontWeight: 600, color: '#FFD24D', marginBottom: '0.13rem', fontSize: '0.97rem'}}>Intermediate Level (TOPIK 3~4)</div>
                <div style={{color:'#222', fontSize:'1.47rem', lineHeight:'1.7'}}>
                  <HighlightedPhrase
                    text="의사는 그의 건강을 좋아지게 하려면 규칙적으로 운동해야 한다고 조언했어요."
                    highlightWords={[
                      {word: '좋아지게', style: {fontWeight:600, textDecoration:'underline', textDecorationColor:'#FFD24D', textDecorationThickness:'2px', textUnderlineOffset:'4px'}},
                      {word: '규칙적으로', style: {fontWeight:600, textDecoration:'underline', textDecorationColor:'#FFD24D', textDecorationThickness:'2px', textUnderlineOffset:'4px'}},
                      {word: '조언했어요', style: {fontWeight:600, textDecoration:'underline', textDecorationColor:'#FFD24D', textDecorationThickness:'2px', textUnderlineOffset:'4px'}},
                    ]}
                  />
                </div>
              </div>
              <div>
                <div style={{fontWeight: 600, color: '#5BC97A', marginBottom: '0.13rem', fontSize: '0.97rem'}}>Advanced Level (TOPIK 5~6)</div>
                <div style={{color:'#222', fontSize:'1.47rem', lineHeight:'1.7'}}>
                  <HighlightedPhrase
                    text="의사는 그의 건강을 증진시키기 위해 정기적으로 운동할 것을 권장했습니다."
                    highlightWords={[
                      {word: '건강', style: {fontWeight:600, textDecoration:'underline', textDecorationColor:'#6C8CFF', textDecorationThickness:'2px', textUnderlineOffset:'4px'}},
                      {word: '증진시키기', style: {fontWeight:600, textDecoration:'underline', textDecorationColor:'#5BC97A', textDecorationThickness:'2px', textUnderlineOffset:'4px'}},
                      {word: '정기적으로', style: {fontWeight:600, textDecoration:'underline', textDecorationColor:'#5BC97A', textDecorationThickness:'2px', textUnderlineOffset:'4px'}},
                      {word: '운동할', style: {fontWeight:600, textDecoration:'underline', textDecorationColor:'#5BC97A', textDecorationThickness:'2px', textUnderlineOffset:'4px'}},
                      {word: '권장했습니다', style: {fontWeight:600, textDecoration:'underline', textDecorationColor:'#5BC97A', textDecorationThickness:'2px', textUnderlineOffset:'4px'}},
                    ]}
                  />
                </div>
              </div>
            </HowItWorksExample>
          </motion.div>
          <div style={{height: '2.5rem'}} />
        </HowItWorksSection>
        </div>
      <FloatingButton />
    </AppContainer>
  );
}

export default App;