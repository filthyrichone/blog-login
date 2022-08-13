declare module '*.vue' {
    import { defineComponent } from "vue";
    const comp: ReturnType<typeof defineComponent>;
    export default comp;
}

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $http: Function;
    }
}