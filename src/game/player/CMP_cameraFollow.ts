export default function player_CMP_cameraFollow(){
    let me: any;
    return {
        add(){
            me = this as any;
        },
        update(){
            camPos(me.pos)
        }
    }
}