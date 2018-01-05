import Promise from 'promise';
import superagent from 'superagent';
import superagentPromise from 'superagent-promise';

const agent = superagentPromise(superagent, Promise);

/**
 * @param {string} files
 * @returns {null} description
 */
export default function handleDrop(files) {
  console.log('files', files.target.files[0]);
  const unassignedPreset = 'ysyhxvyc';
  const formData = new FormData();
  formData.append('file', files.target.files[0]);
  formData.append('tags', 'morerecipe, food, checkpoint');
  formData.append('upload_preset', unassignedPreset);
  formData.append('api_key', '494855913673414');
  formData.append('timestamp', (Date.now() / 1000) || 0);

  return agent
    .post(
      'https://api.cloudinary.com/v1_1/geek-hijabi/image/upload',
      formData
    );
}
