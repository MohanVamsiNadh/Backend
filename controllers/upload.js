const AWS = require('aws-sdk');

module.exports = {
  upload: async (req, res) => {
    const s3 = new AWS.S3({
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_KEY,
      region: process.env.REGION,
    });

    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const { originalname, buffer } = req.file;

      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: originalname,
        Body: buffer,
        ContentType: req.file.mimetype,
      };

      s3.upload(params, (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to upload to S3' });
        }

        res.status(200).json({ message: 'File uploaded to S3 successfully', location: data.Location });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
