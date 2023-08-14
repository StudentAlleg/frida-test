#include "Main.h"
#include <chrono>
#include <thread>

void sleep(int ms) {
    std::this_thread::sleep_for(std::chrono::milliseconds(ms));
}

void printOut(std::string str) {
    std::cout << str << std::endl;
}

int main() {
    for (auto i = 0; i < 500; i++) {
        sleep(2000);
        printOut(std::to_string(i));
    }
}
