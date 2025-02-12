public class p8 {

public static void main(String[] args) {
int n = 5;
crownSymmetry(n);
}

public static void crownSymmetry(int h) {
    int mid = (h + 1) / 2;
    for (int i = mid - 1; i > 0; i--) {
        for (int j = 0; j < mid - i; j++) {
            System.out.print(" ");
            }
        for (int j = 1; j < 2 * i; j++) {
            if (j == 1 || j == (2 * i - 1)) {
                    System.out.print("Crown ");
                    } 
                    else {
                    System.out.print(" ");
                    }
            }
        System.out.println();
    }
for (int i = 1; i <= mid; i++) {
    for (int j = 0; j < mid - i; j++) {
        System.out.print(" ");
    }
    for (int j = 1; j < 2 * i; j++) {
        if (j == 1 || j == (2 * i - 1)) {
            System.out.print("Crown ");
            } else {
                System.out.print(" ");
            }
    }

    System.out.println();
    }
}
}