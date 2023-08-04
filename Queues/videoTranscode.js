const { JobQueue } = require('job-flow')
const ffmpeg = require('fluent-ffmpeg');

const cachedJobQueue = './videoQueue.json';

const jobQueue = new JobQueue(cachedJobQueue)

async function videoTranscode(job) {
    console.log(job.data.filePath);
  const inputFilePath = "./../files/"+job.data.filePath;
  const outputFilePath = "./../files/web/"+job.data.filePath.replace(/\.\w+$/, '.mp4');

  return new Promise((resolve, reject) => {
    // Perform video transcoding using FFmpeg
    ffmpeg(inputFilePath)
      .outputOptions(['-c:v libx264', '-c:a aac', '-movflags faststart'])
      .output(outputFilePath)
      .on('end', () => {
        console.log('Video transcoding completed.');
        resolve(outputFilePath);
      })
      .on('error', (err) => {
        console.error('Error transcoding video:', err.message);
        reject(err);
      })
      .run();
  });
}


jobQueue.setProcessFunction(videoTranscode)

jobQueue.init();