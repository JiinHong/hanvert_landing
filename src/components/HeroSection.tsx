import React, { useState, useCallback } from "react";
import { motion, Variants } from "framer-motion";
import styled from "@emotion/styled";
import StreamingLogos from "./StreamingLogos";

const useIsMobile = () => window.innerWidth <= 900;

const HeroContainer = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, rgb(81, 110, 255) 0%, #a98eff 100%);
  color: white;
  text-align: center;
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1.5rem 1.5rem;
  }
`;

const HeroFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  gap: 3rem;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 0;
  }
`;

const HeroLeft = styled.div`
  flex: 1;
  min-width: 0;
  text-align: left;
  @media (max-width: 900px) {
    text-align: left;
    width: 100%;
  }
`;

const HeroRight = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 900px) {
    width: 100%;
    justify-content: center;
    margin-top: 1.5rem;
  }
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
  color: white;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 0.8rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0 0 1.2rem 0;
  max-width: 800px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);

  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 0 0 1rem 0;
    line-height: 1.5;
  }
`;

const SecondSubtitle = styled(motion.p)`
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0 0 2rem 0;
  max-width: 800px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);

  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 0 0 1.5rem 0;
    line-height: 1.5;
  }
`;

const MicroCopy = styled(motion.p)`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  text-align: left;
  margin: 0.8rem 0 0 0;
  max-width: 520px;
  @media (max-width: 900px) {
    font-size: 0.8rem;
    margin: 0.6rem 0 0 0;
    max-width: 95vw;
    text-align: center;
  }
`;

const CTAButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  border-radius: 50px;
  color: white;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  margin-bottom: 1rem;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const StreamingText = styled(motion.p)`
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const DemoVideo = styled.video`
  width: 75%;
  max-width: 480px;
  aspect-ratio: 1080/1780;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  background: #000;
  display: block;
  object-fit: contain;
  height: auto;
  margin: 0;
  @media (max-width: 900px) {
    width: 65vw;
    max-width: 250px;
    height: auto;
    margin: 2rem auto;
    border-radius: 24px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  }
`;

const FormContainer = styled(motion.form)`
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 999px;
  padding: 0.3rem 0.3rem 0.3rem 1.5rem;
  box-shadow: none;
  width: 100%;
  max-width: 520px;
  margin: 2rem 0 2.5rem 0;
  @media (max-width: 900px) {
    margin: 1rem 0 1.5rem 0;
    max-width: 95vw;
    padding: 0.25rem 0.25rem 0.25rem 1rem;
  }
`;

const EmailInput = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  font-size: 1.1rem;
  padding: 0.9rem 0.5rem;
  outline: none;
  color: #222;
  border-radius: 999px;
  &::placeholder {
    color: #666;
    opacity: 1;
  }
  @media (max-width: 900px) {
    font-size: 0.95rem;
    padding: 0.8rem 0.3rem;
    &::placeholder {
      font-size: 0.9rem;
    }
  }
`;

const SubscribeButton = styled.button`
  background: #222;
  color: #fff;
  border: none;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.8rem 1.4rem;
  margin-left: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
  min-width: 120px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #111;
  }
  @media (max-width: 900px) {
    font-size: 0.9rem;
    padding: 0.7rem 1rem;
    margin-left: 0.3rem;
    min-width: 100px;
    height: 42px;
  }
`;

// 스피너 스타일 컴포넌트 추가
const Spinner = styled.div`
  border: 8px solid #eee;
  border-top: 8px solid #4a90e2;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  animation: spin 1s linear infinite;
  margin-bottom: 24px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const formVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const HeroSection: React.FC = () => {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 900;
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // 영상이 완전히 재생 가능할 때 호출
  const handleVideoCanPlayThrough = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch(
        "https://whlfxkvrmdzgscnlklmn.supabase.co/functions/v1/hanvert-email",
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndobGZ4a3ZybWR6Z3NjbmxrbG1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5OTQwNjUsImV4cCI6MjA2MTU3MDA2NX0.R6aI0I3XLpfr7WEGuyYdwvULgt9HYszYNIx2R6P6tLI",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      if (!res.ok) throw new Error("Failed to submit email");
      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 영상이 아직 로드되지 않았다면 로딩 UI만 보여줌
  if (!isVideoLoaded) {
    return (
      <div style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 24,
        background: "#111",
        color: "#fff"
      }}>
        <Spinner />
        Loading...
        {/* 영상 태그는 숨겨진 상태로 미리 렌더링해서 로드 트리거 */}
        <video
          src={require("../데모.mp4")}
          style={{ display: "none" }}
          onCanPlayThrough={handleVideoCanPlayThrough}
          poster="/poster.png"
        />
      </div>
    );
  }

  return (
    <HeroContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <HeroFlex>
        <HeroLeft>
          <Title variants={itemVariants}>
             The Content You Love. 
            <br />
             In Korean You Can Understand.
          </Title>
          <Subtitle variants={itemVariants}>
            Turn any video you love into an immersive lesson with level-matched subtitles and AI dubbing.
          </Subtitle>
          <SecondSubtitle variants={itemVariants}>
            Learn <strong>real-world vocabulary</strong> that <strong>sticks</strong>—<strong>without the 'brute force' drills.</strong>
          </SecondSubtitle>
          <FormContainer
            variants={formVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleWaitlistSubmit}
          >
            <EmailInput
              type="email"
              placeholder={
                success
                  ? "🎉 You're on the list for early access!"
                  : "your@email.com"
              }
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading || success}
            />
            <SubscribeButton type="submit" disabled={loading || success}>
              {loading ? "Submitting..." : "Unlock the Magic"}
            </SubscribeButton>
          </FormContainer>
          <MicroCopy
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            Join the waitlist and we'll notify you on launch day.
          </MicroCopy>
          {error && (
            <div style={{ color: "#d32f2f", marginTop: 8 }}>{error}</div>
          )}
          {isMobile && (
            <video
              src={require("../데모.mp4")}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100%",
                maxWidth: 320,
                border: "8px solid #fff",
                borderRadius: 40,
                boxShadow: "-12px 16px 32px 0 rgba(0,0,0,0.4)",
                background: "#111",
                display: "block",
                margin: "2.5rem auto 2.5rem auto",
              }}
              onLoadedData={undefined} // 이미 로드됨
              poster="/poster.png"
            />
          )}
          {/* <StreamingText variants={itemVariants}>
            Available on your favorite streaming platforms
          </StreamingText> */}
          {/* <StreamingLogos /> */}
        </HeroLeft>
        {!isMobile && (
          <HeroRight>
            <video
              src={require("../데모.mp4")}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100%",
                maxWidth: 320,
                border: "8px solid #fff",
                borderRadius: 40,
                boxShadow: "-12px 16px 32px 0 rgba(0,0,0,0.4)",
                background: "#111",
                display: "block",
                margin: "0 auto",
              }}
              onLoadedData={undefined} // 이미 로드됨
              poster="/poster.png"
            />
          </HeroRight>
        )}
      </HeroFlex>
    </HeroContainer>
  );
};

export default HeroSection;
