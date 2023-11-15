// module.exports = {
//     frame: {
//         Frame: require('./frame/frame.js')
//     }
// };
import Frame from './frame/frame';
import Workflow from './workflow/index';
export default {
    frame: {
        Frame: Frame
    },
    workflow: {
        Index: Workflow
    }
}

