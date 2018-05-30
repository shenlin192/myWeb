/**
 * Created by shenlin on 11/06/2017.
 */
export function changePath(activeKey) {
    return {
        type: 'CHANGE_PATH',
        payload: {
            activeKey,
        },
    }
}