import React, { useEffect, useRef } from 'react';

const VideoStream = () => {
    const videoRef = useRef(null);
    const pc = useRef(null);

    useEffect(() => {
        const ws = new WebSocket('ws://192.168.137.237:8001');

        ws.onopen = () => {
            console.log('WebSocket working, Yippee');
        };

        ws.onmessage = async (event) => {
            const data = JSON.parse(event.data);

            if (data.sdp) {
                console.log('Session Description protocol:', data.sdp);

                pc.current = new RTCPeerConnection({
                    iceServers: []  
                });

                pc.current.ontrack = (event) => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = event.streams[0];
                    }
                };

                await pc.current.setRemoteDescription(new RTCSessionDescription({
                    type: 'offer',
                    sdp: data.sdp
                }));

                const answer = await pc.current.createAnswer();
                await pc.current.setLocalDescription(answer);

                ws.send(JSON.stringify({ sdp: pc.current.localDescription }));
            }
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Cleanup on component unmount
        return () => {
            if (pc.current) {
                pc.current.close();
            }
            ws.close();
        };
    }, []);

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: 'auto' }} />
        </div>
    );
};

export default VideoStream;
