import {DeleteLibraryFile, GetLibraries, PostLibraryFile} from "@/api/library";

export const moduleLibraries = {
    state: {
        libraries: [
            {
                "name": "Нормативная документация",
                "files": []
            },
            {
                "name": "Основная и дополнительная литература",
                "files": []
            },
            {
                "name": "Публикации",
                "files": []
            },
            {
                "name": "Библиотека текстов диссертаций",
                "files": []
            },
            {
                "name": "Примеры содержания и выпонения индивидуальных проектов",
                "files": []
            }
        ],
    },
    getters: {
        LIBRARIES(state) {
            return state.libraries
        },
    },
    mutations: {
        SET_LIBRARIES_TO_STATE: (state, libraries) => {
            state.libraries = libraries
        },
    },
    actions: {
        GET_LIBRARIES_FROM_API(context) {
            return GetLibraries(context)
                .then(libraries => {
                    context.commit('SET_LIBRARIES_TO_STATE', libraries);
                    return libraries;
                })
        },
        POST_LIBRARY_FILE(context, libraryFile) {
            return PostLibraryFile(context, libraryFile.libraryId, libraryFile.caption, libraryFile.file)
                .then(() => {
                    context.dispatch('GET_LIBRARIES_FROM_API')
                })
        },
        DELETE_LIBRARY_FILE(context, libraryIdFileId) { // libraryIdFileId => {libraryId:123, fileId: 345}
            return DeleteLibraryFile(context, libraryIdFileId.libraryId, libraryIdFileId.fileId)
                .then(() => {
                    context.dispatch('GET_LIBRARIES_FROM_API')
                })

        },
    },
}