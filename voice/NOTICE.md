# Local voice dependencies

This FRED integration adapts inference-worker.js and sentencepiece.js from:
https://github.com/hemanth/pocket-voice
Revision a4496c429f1dcd6ea8faef55a21dc4b7d45636a9.
Upstream declares MIT © Hemanth.HM.

Modifications: Spanish default; voice embedding persistence/export hooks; cancellation completion event; encoder memory release; model caching; integration with FRED.

MIT License
Copyright (c) Hemanth.HM
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Original model: Pocket TTS / Kyutai — https://github.com/kyutai-labs/pocket-tts
ONNX export and web pipeline: KevinAHM — https://huggingface.co/spaces/KevinAHM/pocket-tts-web
Models fetched at runtime: spanish INT8 bundle from that Space.
ONNX Runtime Web 1.20.0 (MIT), fetched from jsDelivr.
SentencePiece is an Apache-2.0 project by Google (https://github.com/google/sentencepiece); upstream web wrapper is retained as distributed by pocket-voice.

reference.wav is the user's supplied recording; no third-party preset voice is substituted. It is distributed only to the user as part of this package, for the use they authorized. Do not publicly publish a personal voice reference without the speaker's authorization.
