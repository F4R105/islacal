import { View } from 'react-native';
import getStyles from "@/lib/styles";

export default function CardListSkeleton() {
    const styles = getStyles();

    return (
        (new Array(7).fill(null).map((item, index) => (
            <View style={styles.skeletonCard} key={index}>
                <View style={[styles.skeletonCardTitle]} />
                <View style={[styles.skeletonCardValue]} />
                <View style={[styles.skeletonCardDescription]} />
            </View>
        )))
    );
}