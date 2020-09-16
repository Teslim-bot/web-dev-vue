import AWS from "aws-sdk";
import Utils from "../Utils";
import NotificationUtils from "./NotificationUtils";
import { format } from "date-fns";
import StoreUtils from "./StoreUtils";

class S3FileUpload {
  static params = {
    ALBUM_BUCKET_NAME: "rubies-insurance-image-uploads",
    ALBUM_BUCKET_LINK:
      "https://rubies-insurance-image-uploads.s3-us-west-2.amazonaws.com/",
    BUCKET_REGION: "us-east-1",
    // IDENTITY_POOL_ID: "us-west-2:99181780-425e-420e-8c91-fb60637c655e",
    IDENTITY_POOL_ID: "us-west-2:169e15d7-e800-4cd9-a1c4-57f3bfaa6609",
    ACCESS_KEY: "AKIAQCMYLE2YI6W4TII6",
    // ACCESS_KEY: "AKIAIMNHHKVB7H3NPX5Q",
    SECRET_KEY: "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",
    // SECRET_KEY: "UR0WrqCJmxgKgNGiMpX5lrOFFThtKE9dH5wunrWS",
    albums: {
      STAGING: "staging",
      RUBIES_INSURANCE: "rubiesInsurance"
    }
  };

  static async uploadFileToS3BucketAsync(
    file,
    targetAlbum,
    uploadProgress = () => {},
    uploadError = () => {}
  ) {
    let albumPhotosKey = encodeURIComponent(targetAlbum) + "/";
    let photoKey = `${albumPhotosKey}${format(
      new Date(),
      "dd-MMM-yyyy HH:mm:ss"
    )}_${Utils.generateNineRandomNumbers()}.${this.getFileExtension(file)}`;

    let s3 = new AWS.S3({
      accessKeyId: S3FileUpload.params.ACCESS_KEY,
      secretAccessKey: S3FileUpload.params.SECRET_KEY
    });

    // Setting up S3 upload parameters
    const params = {
      Bucket: S3FileUpload.params.ALBUM_BUCKET_NAME,
      Key: photoKey,
      Body: file,
      ACL: "public-read"
    };

    return await s3
      .upload(params)
      .on("httpUploadProgress", function(progress) {
        uploadProgress((progress.loaded * 100) / progress.total);
      })
      .promise()
      .then(data => {
        return [{ ...data, url: data.Location }];
      })
      .catch(err => {
        // console.log("uploadError =>", err);
        uploadError(`Unable to upload file`);
      });
  }

  static getFileFinalUrl(oldKey, newName, targetAlbum) {
    return `${
      S3FileUpload.params.ALBUM_BUCKET_LINK
    }${targetAlbum}/${newName}.${this.getFileExtensionFromKey(oldKey)}`;
  }
  static async moveFileInS3Bucket(oldKey, newName, targetAlbum) {
    // create a new s3 object
    let s3 = new AWS.S3({
      accessKeyId: S3FileUpload.params.ACCESS_KEY,
      secretAccessKey: S3FileUpload.params.SECRET_KEY
    });

    let newAlbumPhotosKey = encodeURIComponent(targetAlbum) + "/";
    let newKey = `${newAlbumPhotosKey}${newName}.${this.getFileExtensionFromKey(
      oldKey
    )}`;

    // Copy the object to a new location
    s3.copyObject({
      Bucket: S3FileUpload.params.ALBUM_BUCKET_NAME,
      CopySource: `${S3FileUpload.params.ALBUM_BUCKET_NAME}/${oldKey}`,
      Key: newKey
    })
      .promise()
      .then(() =>
        // Delete the old object
        s3
          .deleteObject({
            Bucket: S3FileUpload.params.ALBUM_BUCKET_NAME,
            Key: oldKey
          })
          .promise()
      );
  }

  static getFileExtension(file) {
    return file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2);
  }

  static getFileExtensionFromKey(fileKey) {
    return fileKey.slice(((fileKey.lastIndexOf(".") - 1) >>> 0) + 2);
  }
}

export default S3FileUpload;
