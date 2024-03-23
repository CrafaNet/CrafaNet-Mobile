import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

export default function useBottomModal() {
    const bottomSheetModalRef = useRef(null);

    const showBottomModal = () => bottomSheetModalRef.current?.present();
    const hideBottomModal = () => bottomSheetModalRef.current?.dismiss();

    const BottomModal = ({ children, snapPoints = ["40%", "60%", "90%"] }) => (
        <BottomSheetModal ref={bottomSheetModalRef} index={0} snapPoints={snapPoints}>
            <View style={styles.container}>{children}</View>
        </BottomSheetModal>
    );

    return [BottomModal, showBottomModal, hideBottomModal];
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});
